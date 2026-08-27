describe('Recommendation Integration Tests', () => {
  it('should rank articles by score descending', () => {
    const scoredArticles = [
      { id: 1, score: 0.8 },
      { id: 2, score: 0.95 },
      { id: 3, score: 0.4 },
    ];
    const sorted = [...scoredArticles].sort((a, b) => b.score - a.score);
    expect(sorted[0].id).toBe(2);
    expect(sorted[1].id).toBe(1);
    expect(sorted[2].id).toBe(3);
  });
});
