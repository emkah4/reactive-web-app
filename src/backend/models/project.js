class Project {
  constructor(id, project_title, project_creation_date, project_status) {
    this.id = id;
    this.project_title = project_title;
    this.project_creation_date = project_creation_date;
    this.project_status = project_status;
    this.groups = [];
  }

  addGroups(groups_data) {
    groups_data.forEach((group) => {
      this.groups.push({
        group_id: group.id,
        group_title: group.group_title,
        group_color: group.group_color,
        group_members: [...group.group_members],
      });
    });
  }
}

module.exports = Project;
