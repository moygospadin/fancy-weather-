import { getСityСoordinates } from './geolocationBlock';

describe('Correct city', () => {
    test('Minsk', async() => {
        expect((await getСityСoordinates('Minsk', 'en', 0)).results[0].components.country).toBe('Belarus');
    });
    test('Paris', async() => {
        expect((await getСityСoordinates('Paris', 'en', 0)).results[0].components.country).toBe('France');
    });
    test('Berlin', async() => {
        expect((await getСityСoordinates('Berlin', 'en', 0)).results[0].components.country).toBe('Germany');
    });
    test('Moscow', async() => {
        expect((await getСityСoordinates('Moscow', 'en', 0)).results[0].components.country).toBe('Russia');
    });
    test('Homel', async() => {
        expect((await getСityСoordinates('Homel', 'en', 0)).results[0].components.country).toBe('Belarus');
    });
    test('Warsaw', async() => {
        expect((await getСityСoordinates('Warsaw', 'en', 0)).results[0].components.country).toBe('Poland');
    });
    test('Washington', async() => {
        expect((await getСityСoordinates('Washington', 'en', 0)).results[0].components.country).toBe('United States of America');
    });
    test('New York', async() => {
        expect((await getСityСoordinates('New York', 'en', 0)).results[0].components.country).toBe('United States of America');
    });
    test('Bern', async() => {
        expect((await getСityСoordinates('Bern', 'en', 0)).results[0].components.country).toBe('Switzerland');
    });
    test('Madrid', async() => {
        expect((await getСityСoordinates('Madrid', 'en', 0)).results[0].components.country).toBe('Spain');
    });
});