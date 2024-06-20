import { useEffect, useState, useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import moment from "moment";
import {
  deleteComment,
  getCommentsByArticleID,
  patchComment,
  postComment,
} from "../utils/api";

function Comments({ article_id, article }) {
  const { user } = useContext(UserContext);
  const [CommentsIsLoading, setCommentsIsLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commentIsDeleted, setCommentIsDeleted] = useState(false);
  const [isDisabled, setDisabled] = useState(false);

  const formatTime = (timeISO) => {
    const newTime = moment(timeISO).format("dddd, MMMM Do YYYY, h:mm a");
    return newTime;
  };

  useEffect(() => {
    setCommentsIsLoading(true);
    getCommentsByArticleID(article_id)
      .then((comments) => {
        setComments(comments);
        setCommentsIsLoading(false);
      })
      .catch((err) => {
        setErr(err);
        setCommentsIsLoading(false);
      });
  }, [article_id]);

  useEffect(() => {
    let timer;
    if (isDisabled) {
      timer = setTimeout(() => {
        setDisabled(false), 2000;
      });
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isDisabled]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isDisabled) {
      return;
    }
    setDisabled(true);

    if (user.username === null) {
      alert("You need to be logged in");
    } else {
      postComment(user.username, newComment, article.article_id).then(
        (newCommentReturned) => {
          setNewComment("");
          setComments((currentComments) => {
            return [newCommentReturned, ...currentComments];
          });
        }
      );
    }
  };

  const handleDeleteComment = (comment_id) => {
    const filtered = comments.filter(
      (commentToDelete) => commentToDelete.comment_id !== comment_id
    );

    try {
      deleteComment(comment_id).then(() => {
        setComments([...filtered]);
        setCommentIsDeleted(true);
      });
    } catch (err) {
      <p>There is an issue deleting the comment </p>;
    }
  };

  if (CommentsIsLoading) return <p> Comments are loading!...</p>;

  const arrayOfComments = comments.map((comment) => {
    return (
      <li key={comment.comment_id} className="userList">
        <div className="author">{comment.author}</div>

        <div>{formatTime(comment.created_at)}</div>

        <div key={comment.comment_id} className="comment_box">
          <div className="text-box">
            <p> {comment.body}</p>
          </div>
          <div className="interactComment">
            <button onClick={() => incVoteComments(comment.comment_id)}>
              ⬆️
            </button>
            <p>{comment.votes}</p>

            {user.username === comment.author ? (
              <p>
                {" "}
                <button
                  onClick={() => {
                    handleDeleteComment(comment.comment_id);
                  }}
                >
                  Delete
                </button>
              </p>
            ) : (
              <p>{""}</p>
            )}
          </div>
        </div>
      </li>
    );
  });

  // }
  /* Here we are optimistically rendering by increasing the vote count before making a new GET request to update all the comments. */
  const incVoteComments = (comment_id) => {
    patchComment(comment_id);

    setComments((existingComment) => {
      return existingComment.map((comment) => {
        if (comment.comment_id === comment_id) {
          return { ...comment, votes: comment.votes + 1 };
        }
        return comment;
      });
    });
  };

  return (
    <>
      {" "}
      <div>
        <h1> Comments </h1>
        <form onSubmit={handleSubmit} className="addComment" id="addNewComment">
          <label className="author">Add Comment</label>
          <textarea
            id="newComment"
            className="inputTextComment"
            multiline="true"
            value={newComment}
            onChange={(e) => {
              setNewComment(e.target.value);
            }}
            required
          ></textarea>
          <button type="submit">Submit</button>
        </form>
        <div>
          <ul>{CommentsIsLoading ? <p>Loading!</p> : arrayOfComments}</ul>
        </div>
      </div>
    </>
  );
}

export default Comments;
