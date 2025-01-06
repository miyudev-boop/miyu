import { Request, Response } from 'express';
import { UserService } from '../../services/database/UserService';
import { Logger } from '../../utils/logger';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  /**
   * Registers a new user.
   * @route POST /api/user/register
   */
  async register(req: Request, res: Response): Promise<Response> {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username, email, and password are required.' });
      }

      Logger.info(`Registering user: ${username}`);
      const newUser = await this.userService.registerUser(username, email, password);

      return res.status(201).json({ success: true, data: newUser });
    } catch (error) {
      Logger.error('Error registering user:', error);
      return res.status(500).json({ error: 'Failed to register user.' });
    }
  }

  /**
   * Logs in a user.
   * @route POST /api/user/login
   */
  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
      }

      Logger.info(`Logging in user with email: ${email}`);
      const token = await this.userService.loginUser(email, password);

      return res.status(200).json({ success: true, token });
    } catch (error) {
      Logger.error('Error logging in user:', error);
      return res.status(500).json({ error: 'Failed to login user.' });
    }
  }

  /**
   * Retrieves a user's profile.
   * @route GET /api/user/profile
   */
  async getProfile(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized access.' });
      }

      Logger.info(`Fetching profile for user ID: ${userId}`);
      const profile = await this.userService.getUserProfile(userId);

      return res.status(200).json({ success: true, data: profile });
    } catch (error) {
      Logger.error('Error fetching user profile:', error);
      return res.status(500).json({ error: 'Failed to retrieve user profile.' });
    }
  }

  /**
   * Updates a user's profile.
   * @route PUT /api/user/profile
   */
  async updateProfile(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.user?.id;
      const { username, email } = req.body;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized access.' });
      }

      Logger.info(`Updating profile for user ID: ${userId}`);
      const updatedProfile = await this.userService.updateUserProfile(userId, { username, email });

      return res.status(200).json({ success: true, data: updatedProfile });
    } catch (error) {
      Logger.error('Error updating user profile:', error);
      return res.status(500).json({ error: 'Failed to update user profile.' });
    }
  }
}

