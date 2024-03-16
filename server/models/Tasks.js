module.exports = (sequelize, DataTypes ) => {

    const Tasks = sequelize.define("Tasks", {
        taskname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        hours: {
            type: DataTypes.INTEGER,
            allowNull: true
        } 
    });
    return Tasks;
} 