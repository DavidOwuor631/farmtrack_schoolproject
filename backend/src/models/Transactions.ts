import { Model, DataTypes, Optional } from 'sequelize';
import db from '../config/databaseConfig';
import User from './user.model';

// Define attributes for Transaction
interface TransactionAttributes {
  id: number;
  productId: number;
  customerId: number;
  quantity: number;
  totalAmount: number;
  paymentMethod: string;
}

// Optional attributes for model initialization
interface TransactionCreationAttributes extends Optional<TransactionAttributes, 'id'> {}

class Transaction extends Model<TransactionAttributes, TransactionCreationAttributes> {
  public id!: number;
  public productId!: number;
  public customerId!: number;
  public quantity!: number;
  public totalAmount!: number;
  public paymentMethod!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the model
Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    customerId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'transactions',
  }
);

// Define associations
Transaction.belongsTo(User, { foreignKey: 'customerId', as: 'customer' });

export default Transaction;
