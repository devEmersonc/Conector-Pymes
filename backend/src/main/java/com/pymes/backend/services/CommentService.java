package com.pymes.backend.services;

import com.pymes.backend.entities.Comment;
import com.pymes.backend.entities.Pyme;
import com.pymes.backend.entities.User;

public interface CommentService {

    Comment createComment(Comment comment, User user, Pyme pyme);
}
