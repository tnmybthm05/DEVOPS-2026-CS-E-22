import Article from '../models/Article.js';

export const getArticles = async (query = {}, page = 1, limit = 20) => {
  const skip = (page - 1) * limit;

  const articles = await Article.find(query)
    .sort({ publishedAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Article.countDocuments(query);

  return {
    articles,
    page,
    totalPages: Math.ceil(total / limit),
    total,
  };
};

export const getArticleById = async (id) => {
  return await Article.findById(id);
};

export const searchArticles = async (keyword, page = 1, limit = 20) => {
  const query = {
    $or: [
      { title: { $regex: keyword, $options: 'i' } },
      { description: { $regex: keyword, $options: 'i' } },
    ],
  };

  return await getArticles(query, page, limit);
};