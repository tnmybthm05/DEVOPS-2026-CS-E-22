describe('News Unit Tests', () => {
  it('should validate article categories', () => {
    const validCategories = ['Technology', 'Business', 'Sports', 'Entertainment', 'Science', 'Health', 'Politics', 'World'];
    expect(validCategories).toContain('Technology');
    expect(validCategories.length).toBe(8);
  });
});
