module.exports = {
    userQuery: {
        list: "SELECT id, name, age, mobile FROM test.customer",
        searchId: "SELECT name, age, mobile FROM test.customer WHERE id=?",
        searchName: "SELECT id, name, age, mobile FROM test.customer WHERE name LIKE ?",
        add:"INSERT into test.person (name, age) VALUES(?, ?)",
        modify:"UPDATE test.person SET name=?, age=? WHERE id=?",
        remove:"DELETE from test.person WHERE id=?"
    }
}