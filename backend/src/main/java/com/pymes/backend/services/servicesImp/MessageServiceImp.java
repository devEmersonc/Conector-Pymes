package com.pymes.backend.services.servicesImp;

import com.pymes.backend.entities.Message;
import com.pymes.backend.entities.Pyme;
import com.pymes.backend.entities.User;
import com.pymes.backend.repositories.MessageRepository;
import com.pymes.backend.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MessageServiceImp implements MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Override
    public Message getMessage(Long id) {
        return messageRepository.findById(id).orElse(null);
    }

    @Override
    public Message createMessage(Message message, User user, Pyme pyme) {
        Message newMessage = new Message();

        newMessage.setMessage(message.getMessage());
        newMessage.setUser(user);
        newMessage.setPyme(pyme);

        return messageRepository.save(newMessage);
    }

    @Override
    public void deleteMessage(Long id) {
        messageRepository.deleteById(id);
    }
}
