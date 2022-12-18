module.exports = (sequelize, DataTypes) => {
    const faculties = sequelize.define("faculties", {
       
        facultyName: {
            type: DataTypes.STRING(255),
            allowNull: false,
            primaryKey: true,
        },
        

    })

    faculties.associate = (models) => {
        faculties.belongsTo(models.universities)
    }
  
    
    return faculties;
}