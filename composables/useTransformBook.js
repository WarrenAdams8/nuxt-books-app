export default function (bookObject) {
  const regex = /\d{4}/g;

  let strippedHtml = "";

  if (bookObject.volumeInfo.description) {
    strippedHtml = bookObject.volumeInfo.description.replace(
      /(<([^>]+)>)/gi,
      ""
    );
  } else {
    strippedHtml = "No description";
  }

  const newBookObject = {
    id: bookObject.id,
    title: bookObject.volumeInfo.title,
    authors: bookObject.volumeInfo.authors,
    thumbnail: bookObject.volumeInfo.imageLinks
      ? bookObject.volumeInfo.imageLinks.thumbnail
      : "https://placehold.co/150x220",
    rating: bookObject.volumeInfo.averageRating
      ? bookObject.volumeInfo.averageRating
      : "N/A",
    pageCount: bookObject.volumeInfo.pageCount
      ? bookObject.volumeInfo.pageCount
      : "N/A",
    maturityRating: bookObject.volumeInfo.maturityRating
      ? bookObject.volumeInfo.maturityRating
      : "N/A",
    date: bookObject.volumeInfo.publishedDate
      ? bookObject.volumeInfo.publishedDate.match(regex)[0]
      : "N/A",
    image: bookObject.volumeInfo.imageLinks
      ? bookObject.volumeInfo.imageLinks.thumbnail + "&fife=w800-h900"
      : "https://placehold.co/800x900",
    description: strippedHtml,
    price: bookObject.saleInfo.listPrice.amount.toFixed(2),
    priceInCents: bookObject.saleInfo.listPrice.amount.toFixed(2) * 100,
  };

  console.log(bookObject)

  return newBookObject;
}

