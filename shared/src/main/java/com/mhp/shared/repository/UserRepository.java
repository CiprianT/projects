package com.mhp.shared.repository;

import com.mhp.shared.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author : rionescu
 */
@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    UserEntity findByUsername(String username);

    /**
     * @author : Marius
     */
    @Query(value="SELECT * FROM users u WHERE  u.user_id != :userId order by u.user_id",nativeQuery = true)
    List<UserEntity> getUsersExceptOneById(@Param("userId") Integer userId);

    UserEntity findUserByUsername(String username);

    @Query(value="SELECT * from users u WHERE u.username LIKE CONCAT('%',:param,'%')",nativeQuery = true)
    List<UserEntity> getUsersALike(@Param("param") String username);
    @Query(value="SELECT * FROM users u WHERE  u.role =1 ",nativeQuery = true)
    List<UserEntity> getAdmins();
}
