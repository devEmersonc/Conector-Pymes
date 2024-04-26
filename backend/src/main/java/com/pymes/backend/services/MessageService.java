package com.pymes.backend.services;

import com.pymes.backend.entities.Message;
import com.pymes.backend.entities.Pyme;
import com.pymes.backend.entities.User;

public interface MessageService {

    Message getMessage(Long id);

    Message createMessage(Message message, User user, Pyme pyme);

    void deleteMessage(Long id);
}
