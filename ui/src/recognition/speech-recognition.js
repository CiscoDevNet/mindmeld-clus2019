export const recognize = () => {
  return new Promise((resolve, reject) => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.start();

    recognition.onresult = (event) => {
      const transcripts = [event.results[0][0].transcript];
      resolve(transcripts);
    };
    recognition.onerror = (error) => {
      reject(error);
    };
  });
};
