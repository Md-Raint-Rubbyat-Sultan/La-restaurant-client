const Blog = () => {
  return (
    <div className="container mx-auto space-y-16 mb-16 px-4 xl:px-0">
      <div className="space-y-5">
        <h1 className="text-4xl text-slate-800">
          <span className="font-semibold">Question:</span> What is one way data
          binding?
        </h1>
        <p>
          <span className="font-semibold">Answer:</span> In React, one-way data
          binding is a programming concept that describes the flow of data in a
          unidirectional manner. It means that data flows in one direction,
          typically from a parent component to a child component. One-way data
          binding is a fundamental principle of React and helps to create a
          predictable and easier-to-maintain code structure.
        </p>
      </div>
      <div className="space-y-5">
        <h1 className="text-4xl text-slate-800">
          <span className="font-semibold">Question:</span> What is NPM in
          node.js?
        </h1>
        <p>
          <span className="font-semibold">Answer:</span> NPM is a package
          management tool used in command line to use various type of packages
          build for javaScript. It usually use to install many kinds of package
          in a project. Also we use npm command in command line to run projects
          like react, angular, vue etc.
        </p>
      </div>
      <div className="space-y-5">
        <h1 className="text-4xl text-slate-800">
          <span className="font-semibold">Question:</span> Different between
          Mongodb database vs mySQL database.
        </h1>
        <div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>MongoDb</th>
                  <th>mySQL</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>1</th>
                  <td>MongoDb is no SQL type data base.</td>
                  <td>mySQL is a tabular form data base.</td>
                </tr>
                <tr>
                  <th>2</th>
                  <td>
                    It is not necessary to use schema to store data in MongoDb.
                  </td>
                  <td>mySQL use schema based data management.</td>
                </tr>
                <tr>
                  <th>3</th>
                  <td>In MongoDb data get stored as key value convention.</td>
                  <td>
                    In mySQL data get stored with initial field and value field.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
