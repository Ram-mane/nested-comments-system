const useFunction = () => {






  const addComment = async (tree, commentId, newComment) => {
    try {
      const response = await fetch(`http://localhost:7878/api/post/1/comment/${commentId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newComment }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add comment');
      }
      
      // If comment added successfully, update the local tree with the new comment
      const updatedComment = await response.json();
      const updatedTree = addCommentToLocalTree(tree, commentId, updatedComment); // Update local tree
      return updatedTree; // Return the updated tree
    } catch (error) {
      console.error('Error adding comment:', error);
      return tree; // Return the original tree if an error occurs
    }
  };

  const addCommentToLocalTree = (tree, commentId, newComment) => {
    if (!Array.isArray(tree.replies)) {
      tree.replies = [];
    }

    if (tree.id === commentId) {
      // Add the new comment to the beginning of the replies array
      tree.replies.unshift(newComment);
      return tree;
    }

    // Recursively update the replies of each comment in the tree
    const updatedReplies = tree.replies.map(com =>
      addCommentToLocalTree(com, commentId, newComment)
    );

    // Update the current comment with the updated replies
    return { ...tree, replies: updatedReplies };
  };



  const deleteComment = async (commentId) => {
    try {
        const response = await fetch(`http://localhost:7878/api/${commentId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete comment');
        }
        return true;
    } catch (error) {
        console.error('Error deleting comment:', error);
        // Return false or handle the error as needed
        return false;
    }
};

    return { addComment , deleteComment};
  };
  
  export default useFunction;
  