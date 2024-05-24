class FormDataStructure {
  constructor(lat, long, user_ip, title, text, photo_id) {
    this.location = {
      lat: lat,
      long: long,
    };
    this.user_ip = user_ip;
    this.title = title;
    this.text = text;
    this.photo_id = photo_id;
  }
}

class MarkerStructure extends FormDataStructure {
  constructor(lat, long, user_ip, title, text, photo_id, id) {
    super(lat, long, user_ip, title, text, photo_id);
    this.id = id;
  }
}

export { FormDataStructure, MarkerStructure };
