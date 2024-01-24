import { sumar } from './miArchivo';

test('Sumar dos numeros', () => {
  expect(sumar(1, 2)).toBe(3);
});
