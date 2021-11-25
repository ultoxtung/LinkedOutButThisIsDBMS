import random


class AuthRouter:
    def db_for_read(self, model, **hints):
        """
        Reads go to a replica.
        """
        return 'master'

    def db_for_write(self, model, **hints):
        """
        Writes always go to master ie default.
        """
        return 'master'

    def allow_relation(self, obj1, obj2, **hints):
        """
        Relations between objects are allowed if both objects are
        in the default/replica pool.
        """
        db_list = ('master', 'slave')
        if obj1._state.db in db_list and obj2._state.db in db_list:
            return True
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        """
        All non-auth models end up in this pool.
        """
        return True


class PrimaryReplicaRouter(object):
    """
    A router to control all read/write database operations.
    """
    def db_for_read(self, model, **hints):
        """
        Reads go to a randomly-chosen replica.
        """
        return select_rand_db()

    def db_for_write(self, model, **hints):
        """
        Writes always go to primary.
        """
        return 'master'

    def allow_relation(self, obj1, obj2, **hints):
        """
        Relations between objects are allowed if both objects are
        in the primary/replica pool.
        """
        return True

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        """
        All non-auth models end up in this pool.
        """
        return True


def select_rand_db():
    """
    this function returns rand db or default if running tests
    :return:
    """
    return random.choice(['master', 'slave'])
