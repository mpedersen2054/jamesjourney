
function power(base, exponent) {
  if (exponent == 0)
    return 1;
  else
    return base * power(base, exponent - 1);
}

console.log(power(4, 4));
// → 8
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuZnVuY3Rpb24gcG93ZXIoYmFzZSwgZXhwb25lbnQpIHtcbiAgaWYgKGV4cG9uZW50ID09IDApXG4gICAgcmV0dXJuIDE7XG4gIGVsc2VcbiAgICByZXR1cm4gYmFzZSAqIHBvd2VyKGJhc2UsIGV4cG9uZW50IC0gMSk7XG59XG5cbmNvbnNvbGUubG9nKHBvd2VyKDQsIDQpKTtcbi8vIOKGkiA4Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
