const Content = ({ content }) => {
  return (
    <section className='bg-white rounded-md shadow-sm py-5 px-5 text-zinc-800'>
      <h3 className='mb-5 flex flex-col'>
        <span className='font-bold text-xl'>{content.title}</span>
        <span className='text-sm text-zinc-600'>{content.reading}</span>
      </h3>
      {content.meanings.map((meaning, index) => {
        return (
          <p key={index} className='mt-3 whitespace-pre-wrap flex gap-2'>
            <span className='font-bold'>{index + 1}.</span>
            <span>{meaning}</span>
          </p>
        );
      })}
    </section>
  );
};

export default Content;
