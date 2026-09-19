import { jest } from '@jest/globals';

const mockUpdateUserPreferences = jest.fn();
const mockGetUserPreferences = jest.fn();

jest.unstable_mockModule('../../services/userProfileService.js', () => ({
  updateUserPreferences: mockUpdateUserPreferences,
  getUserPreferences: mockGetUserPreferences,
}));

const { updatePreferences, getPreferences } = await import('../../controllers/preferenceController.js');

describe('Preference Controller', () => {
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

  describe('updatePreferences', () => {
    it('should return 400 if preferences array is missing', async () => {
      req.body = {}; // no preferences

      await updatePreferences(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Please provide an array of preferences' });
    });

    it('should update preferences and return 200', async () => {
      const mockPreferences = ['AI', 'Technology'];
      req.body = { preferences: mockPreferences };
      
      mockUpdateUserPreferences.mockResolvedValue({
        _id: 'mockUserId123',
        preferences: mockPreferences
      });

      await updatePreferences(req, res);

      expect(mockUpdateUserPreferences).toHaveBeenCalledWith('mockUserId123', mockPreferences);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ preferences: mockPreferences });
    });

    it('should handle internal server errors', async () => {
      req.body = { preferences: [] };
      mockUpdateUserPreferences.mockRejectedValue(new Error('DB Error'));

      await updatePreferences(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'DB Error' });
    });
  });

  describe('getPreferences', () => {
    it('should return user preferences successfully', async () => {
      const mockPreferences = ['Sports'];
      mockGetUserPreferences.mockResolvedValue(mockPreferences);

      await getPreferences(req, res);

      expect(mockGetUserPreferences).toHaveBeenCalledWith('mockUserId123');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ preferences: mockPreferences });
    });

    it('should handle internal server errors', async () => {
      mockGetUserPreferences.mockRejectedValue(new Error('User not found'));

      await getPreferences(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    });
  });
});