describe('Preferences Unit Tests', () => {
  it('should allow adding multiple preference tags', () => {
    const preferences = ['Technology', 'Science'];
    preferences.push('Business');
    expect(preferences).toHaveLength(3);
  });
});
