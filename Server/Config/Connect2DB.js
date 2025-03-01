import mongoose from "mongoose";

const connect = async () => {
  try {
    console.log(`Attempting To Connect To DB`);
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "MERN-CRUD-APP-With-Auth&Email",
    });

    console.log(
      `#################- Successfully Connected To DB -#################`
    );
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export default connect;
