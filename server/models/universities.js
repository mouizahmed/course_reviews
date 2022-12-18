module.exports = (sequelize, DataTypes) => {
    const universities = sequelize.define("universities", {
       
        tag: {
            type: DataTypes.STRING(255),
            allowNull: false,
            primaryKey: true,
        },
        universityName: {
            type: DataTypes.STRING(255),
            allowNull: false,
            primaryKey: true,
        }
        
        
    })

    universities.associate = (models) => {
        universities.hasMany(models.faculties, {
            foreignKey: "tag"
        })
    }

    return universities;
}