import matter from 'gray-matter';


export default (files) => files.map((f) => {
  const m = matter(f.content);

  return {
    ...f,
    ...m.data,

    content: m.content,
  };
});
