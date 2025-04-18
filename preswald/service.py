def get_state_snapshot(cls):
    """Get all info about current state of instance for debug panel"""
    return {
        "components": cls.get_instance().components,
        "variables": cls.get_instance().variable_store,
        "errors": cls.get_instance().error_log,
        "execution_graph": cls.get_instance().workflow_graph.serialize(),
    }
