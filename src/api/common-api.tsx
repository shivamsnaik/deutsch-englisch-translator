export const fetchTranslatedText = async (text: string, source: string, target: string): Promise<any> => {

  return fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${source}&tl=${target}&dt=t&q=${text}`, {
    method: 'GET'
  })
  .then(response => {
    response.json()
    .then(jsonResponse => {
      return jsonResponse;
    });
  })
  .catch(reason => { return reason; });
};