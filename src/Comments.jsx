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
  const [errorMessage, setErr] = useState(null);
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
        setErr(err.message);
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

    let savedComment = {};

    comments.forEach((comment) => {
      if (comment.comment_id !== comment_id) savedComment = comment;
    });
    try {
      deleteComment(comment_id).then(() => {
        setComments([...filtered]);
        setCommentIsDeleted(true);
      });
    } catch (err) {
      setComments([...filtered, savedComment]);
    }
  };

  /* Here we are optimistically rendering by increasing the vote count before making a new GET request to update all the comments. */
  const incVoteComments = (comment_id) => {
    if (user.username === null) {
      alert("You must be logged in to vote on comments");
    } else {
      try {
        patchComment(comment_id);
      } catch {
        setComments((existingComment) => {
          return existingComment.map((comment) => {
            if (comment.comment_id === comment_id) {
              return { ...comment, votes: comment.votes - 1 };
            }
            return comment;
          });
        });
      }
    }
    setComments((existingComment) => {
      return existingComment.map((comment) => {
        if (comment.comment_id === comment_id) {
          return { ...comment, votes: comment.votes + 1 };
        }
        return comment;
      });
    });
  };

  if (errorMessage) {
    <h1> {errorMessage}</h1>;
  }

  if (comments.length > 1) {
    return (
      <>
        {" "}
        <div>
          <h1 className="font-TimesNew mb-3 text-purple-900"> Comments </h1>
          <form
            onSubmit={handleSubmit}
            className="flex mb-10"
            id="addNewComment"
          >
            <label className="font-bold mr-2">Add Comment</label>
            <textarea
              id="newComment"
              className="bg-white text-black resize-none "
              multiline="true"
              value={newComment}
              onChange={(e) => {
                setNewComment(e.target.value);
              }}
              required
            ></textarea>
            <button className=" flex h-10  mt-1" type="submit">
              <p className="text-sm">Submit</p>
            </button>
          </form>
          <div>
            <ul>
              {CommentsIsLoading ? (
                <p>Loading!</p>
              ) : (
                comments.map((comment) => {
                  return (
                    <li
                      key={comment.comment_id}
                      className="list-style-type-none mt-4"
                    >
                      <div className="font-bold capitalize text-sm font-TimesNew">
                        {comment.author}
                      </div>

                      <div className="font-TimesNew text-xs">
                        {formatTime(comment.created_at)}
                      </div>

                      <div key={comment.comment_id} className="mr-1 ml-1">
                        <div className="bg-white flex text-left font-TimesNew">
                          <p> {comment.body}</p>
                        </div>
                        <div className="bg-violet-300  mb-0 flex">
                          <button
                            onClick={() => incVoteComments(comment.comment_id)}
                          >
                            <p> ⬆️</p>
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
                })
              )}
            </ul>
          </div>
        </div>
      </>
    );
  } else {
    <p> Comments is not existing </p>;
  }
}

export default Comments;
