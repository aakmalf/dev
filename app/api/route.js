import { NextResponse } from "next/server";

import connect from "../utils/db";
import Project from "../models/projects";

export const GET = async () => {
  try {
    await connect();

    // q:I already have the data from the database in mongodb. I want to display it on the website. How do I do that?

    // a:You can use the find method from mongoose to get the data from the database.
    // const projects = await Project.find({});
    // return new NextResponse({ status: 200, body: projects });

    // q:How do I display the data on the website?
    // a:You can use the map method to display the data on the website.
    // q:there is no result i only see object object in my website
    // a:You need to convert the data to JSON.
    const projects = await Project.find();
    console.log(projects);
  } catch (error) {
    return new NextResponse({
      status: 500,
      body: "Connection failed!",
    });
  }
};
