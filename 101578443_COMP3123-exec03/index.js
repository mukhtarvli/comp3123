var http = require("http");
//TODO - Use Employee Module here
const employees = require("./Employee");

console.log("Lab 03 - NodeJs");

//TODO - Fix any errors you found working with lab exercise

//Define Server Port
const port = process.env.PORT || 8081;

//Create Web Server using CORE API
const server = http.createServer((req, res) => {
  if (req.method !== "GET") {
    res.writeHead(405, { "Content-Type": "application/json" });
    return res.end(
      JSON.stringify({ error: http.STATUS_CODES[405] })
    );
  }
  
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    return res.end("<h1>Welcome to Lab Exercise 03</h1>");
  }

  if (req.url === "/employee") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(employees));
  }

  if (req.url === "/employee/names") {
    const names = employees
      .map(employee => `${employee.firstName} ${employee.lastName}`)
      .sort();

    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(names));
  }

  if (req.url === "/employee/totalsalary") {
    const totalSalary = employees.reduce(
      (total, employee) => total + employee.Salary,
      0
    );

    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ total_salary: totalSalary }));
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  return res.end(
    JSON.stringify({ error: http.STATUS_CODES[404] })
  );
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});