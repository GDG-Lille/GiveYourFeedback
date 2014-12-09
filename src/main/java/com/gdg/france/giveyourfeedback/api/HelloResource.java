package com.gdg.france.giveyourfeedback.api;

import org.joda.time.DateTime;
import restx.annotations.GET;
import restx.annotations.RestxResource;
import restx.factory.Component;
import restx.security.PermitAll;

@Component
@RestxResource
public class HelloResource {
    @GET("/message")
    @PermitAll
    public Message sayHello(String who) {
        return new Message().setMessage(String.format(
                "hello %s, it's %s",
                who, DateTime.now().toString("HH:mm:ss")));
    }

    public class Message {
        private String message;
        public String getMessage() {
            return message;
        }
        public Message setMessage(String message) {
            this.message = message;
            return this;
        }
        @Override
        public String toString() {
            return "Message{" +
                    "message='" + message + '\'' +
                    '}';
        }
    }
}
