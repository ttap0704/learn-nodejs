const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.model {
  static init(sequelize) {
    return super.init({
      name: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
      },
      age: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      married: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      }
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      paranoid: false,
      modelName: 'User',
      tableName: 'users',
      charset: 'utf8',
      collate: 'utf8_general_ci'
    })
  }

  static assoicate(db) {
    db.User.hasMany(dv.Comment, { foreignKey: 'commenter', sourceKey: 'id'})
  }
}

