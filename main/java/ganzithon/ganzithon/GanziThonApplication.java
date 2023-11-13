package ganzithon.ganzithon;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class GanziThonApplication {

    public static void main(String[] args) {
        SpringApplication.run(GanziThonApplication.class, args);
    }

}
