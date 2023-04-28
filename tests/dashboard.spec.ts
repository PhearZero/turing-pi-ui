import { expect, test } from '@playwright/test';

test('dashboard basic functionality', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

	await page.getByRole('row', { name: 'node1 Demo Node' }).getByRole('radio').check();
	await page.getByRole('row', { name: 'node2 Demo Node' }).getByRole('radio').check();
	await page.getByRole('row', { name: 'node3 Demo Node' }).getByRole('radio').check();
	await page.getByRole('row', { name: 'node4 Demo Node' }).getByRole('radio').check();
	await page.locator('input[name="node4"]').check();
	await page.locator('input[name="node3"]').check();
	await page.locator('input[name="node2"]').check();
	await page.locator('input[name="node1"]').check();
	await page.getByRole('link', { name: 'Theme' }).click();
	await page.getByText('Dark').click();
	await page.getByRole('link', { name: 'Theme' }).click();
	await page.getByText('Light').click();
});

