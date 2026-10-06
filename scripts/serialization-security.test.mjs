import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import test from 'node:test';

// Resolve the serializer used by Solid, including nested installs.
const require = createRequire(import.meta.url);
const consumerRequire = createRequire(require.resolve('solid-js/web'));
const { fromJSON, toJSON, toJSONAsync } = consumerRequire('seroval');
const { HeadersPlugin, URLPlugin } = consumerRequire('seroval-plugins/web');
const { sharedConfig } = consumerRequire('solid-js');
const { renderToString } = consumerRequire('solid-js/web');

test('plugin-produced callable cannot become a Promise then handler', async () => {
  let calls = 0;
  const plugin = {
    tag: 'security-callable', test: () => false, parse: {}, serialize: () => '',
    deserialize: () => function (resolve) { calls++; resolve('unexpected'); },
  };
  const payload = {
    t: { t: 12, i: 0, s: 1, f: { t: 10, i: 1,
      p: { k: ['then'], v: [{ t: 25, i: 2, c: plugin.tag, s: {} }] }, o: 0 } },
    f: 63, m: [],
  };
  await assert.rejects(async () => await fromJSON(payload, { plugins: [plugin] }));
  await Promise.resolve();
  assert.equal(calls, 0);
});

for (const constructor of ['Uint8Array', 'Uint32Array']) {
  test(`${constructor} rejects an object masquerading as an ArrayBuffer`, () => {
    // Bounded allocation demonstrates the advisory without exhausting memory.
    const payload = { t: { t: 15, i: 0, c: constructor,
      f: { t: 10, i: 1, p: { k: ['length'], v: [{ t: 0, s: 32 }] }, o: 0 },
      b: 0, l: 32 }, f: 63, m: [] };
    assert.throws(() => fromJSON(payload));
  });
}

test('ordinary values, typed arrays, Promises and web plugins still round-trip', async () => {
  const value = { date: new Date('2026-10-06T00:00:00Z'),
    map: new Map([['answer', 42]]), bytes: new Uint8Array([1, 2, 3]) };
  assert.deepEqual(fromJSON(toJSON(value)), value);
  assert.deepEqual(await fromJSON(await toJSONAsync(Promise.resolve(value))), value);
  const plugins = [URLPlugin, HeadersPlugin];
  const web = { url: new URL('https://fsdcli.me/?framework=angular'),
    headers: new Headers({ 'content-type': 'application/json' }) };
  const restored = fromJSON(toJSON(web, { plugins }), { plugins });
  assert.equal(restored.url.href, web.url.href);
  assert.deepEqual([...restored.headers], [...web.headers]);
});

test('Solid server resource rendering keeps serializer integration working', () => {
  const html = renderToString(() => {
    sharedConfig.context.serialize('security-control', {
      title: 'compatible', bytes: new Uint32Array([1, 2]),
      url: new URL('https://fsdcli.me/'),
    });
    return '<p>compatible</p>';
  });
  assert(html.includes('compatible'));
  assert(html.includes('_$HY'));
});
