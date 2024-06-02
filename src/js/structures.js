class FormDataStructure {
  constructor(lat, long, user_ip, title, text, photo_id, category_id, category_type, user_id) {
    this.location = {
      lat: lat,
      lng: long,
    };
    this.user_ip = user_ip;
    this.title = title;
    this.text = text;
    this.photo_id = photo_id;
    this.category_id = category_id;
    this.category_type = category_type;
    this.user_id = user_id;
  }

  serialize() {
    return {
      location: {
        lat: this.location.lat,
        lng: this.location.lng,
      },
      user_id: this.user_id,
      user_ip: this.user_ip,
      title: this.title,
      text: this.text,
      photo_id: this.photo_id,
      category: {
        id: this.category_id,
        type: this.category_type,
      },
    };
  }
}

class MarkerStructure {
    constructor(lat, long, user_ip, title, text, photo, id, category_id, category_type, user_id) {
        this.location = {
          lat: lat,
          lng: long,
        };
        this.user_ip = user_ip;
        this.title = title;
        this.text = text;
        this.photo = photo;
        this.category_id = category_id;
        this.category_type = category_type;
        this.id = id;
        this.user_id = user_id;
      }

    serialize() {
    return {
        id: this.id,
        location: {
            lat: this.location.lat,
            lng: this.location.lng,
        },
        user_id: this.user_id,
        user_ip: this.user_ip,
        title: this.title,
        text: this.text,
        photo: {
            id: this.photo.id,
            name: this.photo.name,
            link: this.photo.link,
        },
        category: {
            id: this.category_id,
            type: this.category_type,
        },
    };
    }
}

export { FormDataStructure, MarkerStructure };
