package com.bsn.book_network.feedback;

import com.bsn.book_network.book.Book;
import com.bsn.book_network.book.BookRepository;
import com.bsn.book_network.common.PageResponse;
import com.bsn.book_network.exception.OperationNotPermittedException;
import com.bsn.book_network.user.User;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class FeedbackService {
    private final BookRepository bookRepository;
    private final FeedbackMapper feedbackMapper;
    private final FeedbackRepository feedbackRepository;

    public Integer save(FeedbackRequest request, Authentication connectedUser) {
        Book book = bookRepository.findById(request.bookId()).orElseThrow(
                () -> new EntityNotFoundException("No Book found with this ID: " + request.bookId())
        );
        if(!book.isShareable() && book.isArchived()) {
            throw new OperationNotPermittedException("You can not give a feedback for an archived book or non sharable book");
        }
        User user = ((User) connectedUser.getPrincipal());
        if(Objects.equals(book.getOwner().getId(), user.getId())) {
            throw new OperationNotPermittedException("You can not give feedback for your own book");
        }
        Feedback feedback = feedbackMapper.toFeedback(request);

        return feedbackRepository.save(feedback).getId();
    }

    public PageResponse<FeedbackResponse> findAllFeedbacksByBook(int page, int size, Integer bookId, Authentication connectedUser) {
        Pageable pageable = PageRequest.of(page, size);
        User user = ((User) connectedUser.getPrincipal());
        Page<Feedback> feedbacks = feedbackRepository.findAllFeedbacksByBook(pageable, bookId);
        List<FeedbackResponse> feedbackResponses = feedbacks.stream().map(
                f -> feedbackMapper.toFeedbackResponse(f, user.getId())
        ).toList();
        return new PageResponse<>(
                feedbackResponses,
                feedbacks.getNumber(),
                feedbacks.getSize(),
                feedbacks.getTotalElements(),
                feedbacks.getTotalPages(),
                feedbacks.isFirst(),
                feedbacks.isLast()
        );
    }
}
