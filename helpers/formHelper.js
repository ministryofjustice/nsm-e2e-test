export const fillDate = async (page, day, month, year) => {
    await page.getByRole('textbox', { name: 'Day' }).fill(day.toString());
    await page.getByRole('textbox', { name: 'Month' }).fill(month.toString());
    await page.getByRole('textbox', { name: 'Year' }).fill(year.toString());
};

export const formatDate = (dateObject) => {
    const date = new Date(dateObject.year, dateObject.month - 1, dateObject.day);
    return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
};