const formatDate = uploadDate => {
  const dateArray = uploadDate.split(' ');
  const date = dateArray[2];
  const month = dateArray[1];
  const year = dateArray[3];
  return `${date} ${month}, ${year}`;
};

const sortPosts = (posts, sortBy) => {
  if (sortBy === 'newest') {
    return [...posts].sort(
      (post1, post2) => new Date(post2.uploadDate) - new Date(post1.uploadDate)
    );
  }
  if (sortBy === 'oldest') {
    return [...posts].sort(
      (post1, post2) => new Date(post1.uploadDate) - new Date(post2.uploadDate)
    );
  }
};

const isPostLiked = (id, likedPosts) => {
  return likedPosts?.some(postId => postId === id);
};

const isPostBookmarked = (id, bookmarks) => {
  return bookmarks?.some(bookmark => bookmark?.id === id);
};

export { formatDate, sortPosts, isPostLiked, isPostBookmarked };
