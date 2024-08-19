import User from './user';
import Product from './product';

export const setupAssociations = () => {
  User.hasMany(Product, {
    sourceKey: 'id',
    foreignKey: 'sellerId',
    as: 'products'
  });

  Product.belongsTo(User, {
    foreignKey: 'sellerId',
    as: 'seller'
  });
};