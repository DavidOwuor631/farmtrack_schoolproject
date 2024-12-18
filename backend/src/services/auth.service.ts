import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model';

class AuthService {
  async login(email: string, password: string): Promise<string> {
    const user = await UserModel.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
  }

  async signup(userData: { name: string; email: string; password: string }) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return UserModel.create({ ...userData, password: hashedPassword });
  }
}

export default new AuthService();
