module.exports = {
    user: {
        list: "SELECT id, name, age FROM test.person",
        search: "SELECT id, name, age \
        FROM test.person\
        WHERE name LIKE ?",
        add:"INSERT into test.person (name, age) VALUES(?, ?)",
        modify:"UPDATE test.person SET name=?, age=? WHERE id=?",
        remove:"DELETE from test.person WHERE id=?"
    }
}