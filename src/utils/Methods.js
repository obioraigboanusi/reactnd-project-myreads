export function correctShelfName(name) {
    switch (name) {
      case "currentlyReading":
        return "Currently Reading";
        break;
      case "wantToRead":
        return "Want To Read";
        break;
      case "read":
        return "Read";
        break;
      default:
        return "None"
        break;
    }
  }