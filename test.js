let tag_id_arr = [];
let tags_arr = [];
const { task, date, time, done, assignTo } = doc.data();
//join table
this.tasks_tags.where('task_id', '==', doc.id).get().then((snapshot) => {
    snapshot.forEach(doc => {
        tag_id_arr.push(doc.data().tag_id);
    });
    this.tags.get().then((snapshot) => {

        snapshot.forEach(doc => {

            if (tag_id_arr.includes(doc.id)) {

                tags_arr.push(doc.data().tag);
            }
        });
    }).then(() => {
        //join table
        items.push({
            key: doc.id,
            doc, // DocumentSnapshot
            task,
            date,
            time,
            tags: tags_arr,
            done,
        });
        this.setState({ items })
    });
})