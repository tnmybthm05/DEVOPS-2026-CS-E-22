import { logUserInteraction, getUserInteractions } from '../../controllers/interactionController.js';
import * as interactionService from '../../services/interactionService.js';

jest.mock('../../services/interactionService.js');

describe('Interaction Controller', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      user: { _id: 'mockUserId123' },
      body: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.clearAllMocks();
  });

  describe('logUserInteraction', () => {
    it('should return 400 if articleId or actionType is missing', async () => {
      req.body = { articleId: '123' }; // missing actionType

      await logUserInteraction(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Article ID and actionType are required' });
    });

    it('should return 400 for invalid actionType', async () => {
      req.body = { articleId: '123', actionType: 'invalid_action' };

      await logUserInteraction(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid actionType' });
    });

    it('should log interaction and return 201', async () => {
      req.body = { articleId: 'article123', actionType: 'like', duration: 10 };
      const mockInteraction = { _id: 'int123', action: 'like' };
      
      interactionService.logInteraction.mockResolvedValue(mockInteraction);

      await logUserInteraction(req, res);

      expect(interactionService.logInteraction).toHaveBeenCalledWith('mockUserId123', 'article123', 'like', 10);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockInteraction);
    });
  });

  describe('getUserInteractions', () => {
    it('should return user interactions', async () => {
      const mockInteractions = [{ action: 'view' }, { action: 'like' }];
      interactionService.getInteractionsByUser.mockResolvedValue(mockInteractions);

      await getUserInteractions(req, res);

      expect(interactionService.getInteractionsByUser).toHaveBeenCalledWith('mockUserId123');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockInteractions);
    });
  });
});