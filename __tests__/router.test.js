/**
 * @jest-environment jsdom
 */
 import { pushToHistory } from '../scripts/router.js';

 describe('pushToHistory', () => {
    test('length after pushing settings', () => {
      expect(pushToHistory('settings',0).length).toBe(2);
    });
  
    test('state after pushing entry', () => {
      expect(pushToHistory('entry',1).state).toEqual({ page: "entry1" });
    });

    test('state after pushing main', () => {
        expect(pushToHistory('',0).state).toEqual({});
    });
  });