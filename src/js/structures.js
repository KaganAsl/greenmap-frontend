class FormDataStructure {
  constructor(lat, long, user_ip, title, text, photo_id, category_id) {
    this.location = {
      lat: lat,
      lng: long,
    };
    this.user_ip = user_ip;
    this.title = title;
    this.text = text;
    this.photo_id = photo_id;
    this.category_id = category_id;
  }

  serialize() {
    return {
      location: {
        lat: this.location.lat,
        lng: this.location.lng,
      },
      user_ip: this.user_ip,
      title: this.title,
      text: this.text,
      photo_id: this.photo_id,
    };
  }
}

class MarkerStructure extends FormDataStructure {
  constructor(lat, long, user_ip, title, text, photo_id, id, category_id) {
    super(lat, long, user_ip, title, text, photo_id, category_id);
    this.id = id;
  }
    serialize() {
        const serializedData = super.serialize();
        serializedData.id = this.id;
        return serializedData;
    }
}

export { FormDataStructure, MarkerStructure };
