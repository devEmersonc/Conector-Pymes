package com.pymes.backend.services.servicesImp;

import com.pymes.backend.entities.Comment;
import com.pymes.backend.entities.Pyme;
import com.pymes.backend.entities.User;
import com.pymes.backend.repositories.CommentRepository;
import com.pymes.backend.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentServiceImp implements CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Override
    public Comment createComment(Comment comment, User user, Pyme pyme) {
        Comment newComment = new Comment();

        newComment.setComment(comment.getComment());
        newComment.setUser(user);
        newComment.setPyme(pyme);

        return commentRepository.save(newComment);
    }
}
